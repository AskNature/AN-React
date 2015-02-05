# Database Migration

This file documents how data from the AskNature 1.x mySQL database has been mapped to the AskNature 2.x OrientDB database.

Learn more about the relationships found in the AskNature 1.x schema via [this set of diagrams](https://www.lucidchart.com/documents/view/4170522c-52fa-9c89-b8d7-7bbc0a00ce6b).

In general, this migration followed the process described in the [Import from a CSV file to a Graph](http://www.orientechnologies.com/docs/2.0/orientdb-etl.wiki/Import-from-CSV-to-a-Graph.html) chapter of the OrientDB documentation. There's also [a good video tutorial at Udemy](https://www.udemy.com/orientdb-getting-started/#/lecture/1998370). After some early trials with CSV and JSON dumps, JSON turned out to be a much easier format to work with.

##Process

1. Export tables to JSON. It's simplest (easiest to comprehend) if tables without relationship dependencies are exported on their own, and if each relationship type is exported independently. [Read a better description of this concept here](http://www.orientechnologies.com/docs/2.0/orientdb-etl.wiki/Import-from-CSV-to-a-Graph.html#1-export-to-csv).
2. Delete automated header the JSON plugin adds to top of exported json file. The snipped below should be edited so it starts at the brackets ```[{"id": 1,...```:

 ```
 /**
 Export to JSON plugin for PHPMyAdmin
 @version 0.1
 */

 /* Database 'biomimicry' */
 /* biomimicry.highlighted_content */

 [{"id": 1,"type": "strategy","name": "Retrofit" ...
 ```
 Most of the exported tables that included fields that allowed html input have needed cleaning up.

 It also has been helpful to pre-assign partial schemas for each new class that explicitly tell OrientDB to treat fields like "masterid" and "newpassword" as STRINGS rather than INTEGERS, which it sometime defaults to.

3. Create a JSON file to tell the importer how to map the data.

 The simplest version of this just translates a table to a new vertex class without defining edges, like so (note that this includes a "merge" tranformer, which makes sure the import doesn't result in duplicate entries):

 ```
 {
  "config": {
    "log": "debug"
  },
  "begin": [
  ],
  "source" : {
    "file": { "path": "../products.json", "lock" : true }
  },
  "extractor" : {
    "json": {}
  },
  "transformers" : [
    { "json": { } },
    { "merge": {"joinFieldName": "masterid", "lookup": "Products.masterid"}},
    { "vertex": { "class": "Products" }}
  ],
  "loader" : {
    "orientdb": {
      "dbURL": "remote:localhost/databases/AskNature",
      "dbUser": "***",
      "dbPassword": "***",
      "dbAutoCreate": true,
      "tx": false,
      "batchCommit": 1000,
      "dbType": "graph"
    }
  }
}
```
 In some cases a child/parent hierarchy of records is defined within the table being imported. For instance, every Linnaean species is the child of a Linnaean genus, whose unique ID is referenced in the species record. We add an index and define an edge class (note that this example uses a CSV source file, but could just as easily be JSON):

 ```
 {
  "config": {
    "log": "debug"
  },
  "begin": [
  ],
  "source" : {
    "file": { "path": "../functions.csv", "lock" : true }
  },
  "extractor" : {
    "row": {}
  },
  "transformers" : [
    { "csv": { "separator": ",", "nullValue": "NULL" } },
    { "vertex": { "class": "Function" }},
    { "edge": { "class": "ChildOf",
                "joinFieldName": "parentid",
                "lookup": "Function.area_masterid"}}
  ],
  "loader" : {
    "orientdb": {
      "dbURL": "remote:localhost/databases/AskNature",
      "dbUser": "***",
      "dbPassword": "***",
      "dbAutoCreate": true,
      "tx": false,
      "batchCommit": 1000,
      "dbType": "graph",
      "indexes": [
        {"class":"Function", "fields":["area_masterid:integer"], "type":"UNIQUE" }
      ]
    }
  }
}
```

 The source DB has a *relations* table that defines a number of relationships between various record types. This actually represents a pretty impressive stab at a mySQL version of "edges." There are two records for each relationship, one from A -> to -> B and another from B -> to -> A. We only need one set (i.e. A>B), but must be cognizant of which direction we want this edge to go in the graph. In the following example, the exported file incapsulated a filtered set from *relations* based on the following SQL query:

 ```
 SELECT *
 FROM `relations`
 WHERE `from_type` LIKE 'product'
 AND `to_type` LIKE 'aof'
 ```

 ```
 {
  "config": {
    "log": "debug"
  },
  "begin": [
  ],
  "source" : {
    "file": { "path": "../relations_product-function.json", "lock" : true }
  },
  "extractor" : {
    "json": {}
  },
  "transformers" : [
    { "json": {} },
    { "merge": { "joinFieldName": "from_masterid", "lookup":"Product.masterid", "unresolvedLinkAction" : "SKIP"}},
    { "vertex": { "class": "Product" }},
    { "edge": { "class": "HasFunction",
                "joinFieldName": "to_masterid",
                "lookup": "Function.masterid"}}
  ],
  "loader" : {
    "orientdb": {
      "dbURL": "remote:localhost/databases/AskNature",
      "dbUser": "***",
      "dbPassword": "***",
      "dbAutoCreate": true,
      "tx": false,
      "batchCommit": 1000,
      "dbType": "graph",
      "indexes": [
        {"class":"Function", "fields":["masterid:integer"], "type":"UNIQUE" },
        {"class":"Product", "fields":["masterid:string"], "type":"UNIQUE" }
      ]
    }
  }
}
 ```
 And what of tables that necessitate the creation of multiple edges? One method is to use the above technique multiple times with various edge definitions. OR you can add multiple edges to the transformer, like so:

  ```
  {
  "config": {
    "log": "debug"
  },
  "begin": [

  ],
  "source" : {
    "file": { "path": "../importdata/relations_product.json", "lock" : true }
  },
  "extractor" : {
    "json": {}
  },
  "transformers" : [
    { "json": {} },
    { "merge": { "joinFieldName": "from_masterid", "lookup":"InspiredSolutions.masterid", "unresolvedLinkAction" : "NOTHING"}},
    { "vertex": { "class": "InspiredSolutions" }},
    { "edge": {
          "class": "RelatedTo",
          "joinFieldName": "to_masterid",
          "lookup": "InspiredSolutions.masterid",
          "direction": "out",
          "if": "to_type LIKE 'product'"
        }
    },
    { "edge": {
          "class": "InspiredBy",
          "joinFieldName": "to_masterid",
          "lookup": "Strategy.masterid",
          "direction": "out",
          "if": "to_type LIKE 'strategy'"
        }
    },
    { "edge": {
          "class": "HasFunction",
          "joinFieldName": "to_masterid",
          "lookup": "Function.masterid",
          "direction": "out",
          "if": "to_type LIKE 'aof'"
        }
    },
    { "edge": {
          "class": "FeaturedIn",
          "joinFieldName": "to_masterid",
          "lookup": "Sources.masterid",
          "direction": "out",
          "if": "to_type LIKE 'referenceMaterial'"
        }
    },
    { "edge": {
          "class": "StudiedBy",
          "joinFieldName": "to_masterid",
          "lookup": "Experts.masterid",
          "direction": "out",
          "if": "to_type LIKE 'expert'"
        }
    },
    { "edge": {
          "class": "Bookmarked",
          "joinFieldName": "to_masterid",
          "lookup": "Users.masterid",
          "direction": "in",
          "if": "to_type LIKE 'user'"
        }
    }
  ],
  "loader" : {
    "orientdb": {
      "dbURL": "remote:localhost/databases/AskNature2",
      "dbUser": "admin",
      "dbPassword": "admin",
      "dbAutoCreate": true,
      "tx": false,
      "batchCommit": 1000,
      "dbType": "graph",
      "indexes": [
        {"class":"InspiredSolutions", "fields":["masterid:string"], "type":"UNIQUE" }
      ]
    }
  }
}

 ```

5. Finally, run the ETL process from the command line:
 ```
 $ cd bin
 $ ./oetl.sh ../ETL_Direcory/ETLfile.json
 ```
 The debug console should give you a good sense about whether things are working or not.

 If you're using the files that already exist, this is the rough sequence that was used:

 None of these have dependencies:

 1. Strategy
 2. Products
 3. Experts
 4. Reference
 5. Functions (creates edges between parents and children)
 6. Organisms (creates edges between parents and children)
 7. Users

 These all have dependencies on vertices created above:

 8. Userbans
 9. Relations-product
 10. Relations-strategy
 11. Relations-user
 12. Files

6. Check to make sure everything worked using OrientDB Studio or ```./bin/console.sh```.

##Migration Map

| Original Table Name | Migration Status | New V Class Name/s | New E Class Name/s | ETL File | Notes |
| ---               | ---   | ---   | ---   | ---   | ---   |
| activity          | N |
| activity_phrases  | N |
| app_privileges    | N | | | | Defines which user types can edit files with various draft-related designations. |
| *areas*             | Y✔✔ | **Phenomena**✔✔ | Phenomena>**ChildOf**>Phenomena✔✔, See *relations*. | ETLFunctionsCSV.json✔✔ | AKA Functions. This taxonomy will serve edges connecting solutions with mechanisms AND outcomes. FOr now, this class name is still "Function". |
| articles          | N |||| Not sure what to do with these yet. We'll probably just start from scratch, since 'articles' don't have many impacts on the graph. |
| *comments*          | Y | **Comments** | Users>**WroteComment**>Comments, [Challenges,InspiredSolutions,LifeSolutions,LivingSystem,Phenomena,Users]>**HasComment**>Comments | ETLCommentsJSON.json | Needs to be imported after dependencies (strategy, product, user). |
| content_excludes  | N |
| curators          | N | | | | There are a few potentially valuable bios in this table, but they're all part of a discontinued curator community.
| email-templates   | N |||| There are some potentially valuable templates in this table, but there's not a great reason for them to live in the new DB. |
| entities          | N |||| This is basically a syntax localization table, which the new app will take care of in a different way. |
| entity_privileges | N |
| error_log         | N |
| *experts*           | Y | **Experts**✔✔ | See *relations* | ETLExpertsJSON.json✔✔ | This will likely be deprecated, but is being migrated b/c we're not 100% sure what to do with it yet..
| *files*             | Y | **Media**✔ | [InspiredSolutions✔,LifeSolutions✔, Users✔]>**HasMedia**>Media, Users>**AddedMedia(Contributed)**>Media✔, See *s_files* | ETLFiles-wholeJSON.json✔ | |
| geocache          | N |||| This table is populated by a script that USED TO automatically assign geographic info to addresses entered by users in their bios. The script is now defunct and we don't need this data anyway. |
| groups            | N |||| Defunct service. We'll start from scratch with any future features. |
| group_members     | N |||| Assigned users and roles to various groups. |
| habitats          | N |||| We may introduce a similar class in the future, but will start from scratch if we do. |
| *highligted_content* | Y | **Collections** || ETLCollectionsJSON.json✔ | This table contains info on the hand-curated collections of related content. These will represent the first public "collections" that will be owned by the new "AskNature" user.
| invitations       | N |
| log               | N |
| *messages*          | Y | | Users>**SentMessage**>Messages, Users>**ReceivedMessage**>Messages | ETLsender-message-receiver_EdgeJSON.json | Not sure yet how/if these will be integrated, but some users may at least want a record of past conversations. |
| *message_data*      | Y | **Messages** | See *messages* | ETLMessagesJSON.json✔ | |
| *organisms*         | Y✔✔ | **LivingSystems**✔✔ | LivingSystem>**ChildSystemOf(ChildOf)**>LivingSystem✔✔ | ETLOrganismsCSV.json✔✔ | Not sure if we really need to house the entire (HUGE) Linnaean taxonomy in AskNature, but we do for now.
| organism_data_sources | N |||| This is a decent list of data sources, but it's not being actively used. |
| portal_layouts    | N |
| *products*          | Y✔✔ | **InspiredSolutions**✔✔ | See *relations*, *comments* | ETLProductsJSON.json✔✔ ||
| *reference_materials* | Y | **Sources**✔✔ | See *relations* | ETLReferenceJSON.json✔✔ ||
| *relations*         | Y | | [InspiredSolution✔✔,LifeSolution✔✔]>**HasOutcome**>Phenomena, InspiredSolution>**InspiredBy**>LifeSolution✔✔, InspiredSolution>**HasLivingSystem**>LivingSystem✔✔, [InspiredSolution✔✔,LifeSolution✔✔]>**StudiedBy**>Experts, [InspiredSolution✔✔,LifeSolution✔✔]>**FeaturedIn**>Sources, User>**Friends**>User✔✔, User>**Bookmarked**>[InspiredSolutions✔✔,LifeSolutions✔✔,Sources✔✔,Experts✔✔] | ETLRelations-productJSON.json✔✔, ETLRelations-strategyJSON.json✔✔, ETLRelations-userJSON.json✔✔ | This is a goal: User>**HasCollection**>Collections<**InCollection**<[InspiredSolution,LifeSolution] to replace the bookmarked thing. There were MANY user>user relationships labeled "Friend Request" but only a few hundred such user>user relationships that appeared to be approved. I only imported those. |
| schema_info       | N |
| search_history    | N |||| This will be exported and saved for posterity, though. |
| sessions          | N |||| Fun fact: AskNature keeps a log of every single session that's ever happened. 45 million and counting... |
| stats             | N |
| *strategies*        | Y✔✔ | **LifeSolutions**✔✔ | See *relations*, *comments* | ETLStrategiesCSV.json✔✔ | For now, this class is still named "Strategy"|
| s_activity        | N |||| Activity feed that would be mostly meaningless, unless we think there's value in cleaning data and showing who our most active users are from the get-go.|
| s_countries       | Y | **Countries (lists)** | Users>**LocatedIn(meta)**>Countries | ETLCountriesJSON.json ||
| *s_experts*         | Y | **ExpertTypes (lists)** | Experts>**ExpertType(meta)**>ExpertTypes | ETLs_expertsJSON.json | Research lab vs individual. This will likely be deprecated. |
| *s_files*           | Y | **Licenses (lists)** | Media>**HasLicense(meta)**>Licences | ETLs_filesJSON.json | This table just lists CC license types and links. Ultimately it doesn't make a whole lot of sense to keep this info stored here, since the list will almost always be out of date. |
| s_groups          | N |
| s_group_members   | N |
| s_habitats        | N |
| s_organisms       | N |||| Conservation status and general organism type. No reason to house this info here. |
| *s_products*        | Y | **DevelopmentPhases (lists)** | InspiredSolution>**InPhase(meta)**>DevelopmentPhase | ETLs_productsJSON.json |
| *s_reference_materials* | Y | **SourceTypes (lists)** | Sources>**IsType(meta)**>SourceType | ETLs_reference_materialsJSON.json ||
| s_relations       | N |
| *s_states*          | Y | **States (lists)** | Users>**LocatedIn(lists)**>States |
| s_timezones       | N |
| *s_users*           | Y | **Disciplines (lists)**, **Genders (lists)** | Users>**Practices(meta)**>Disciplines, Users>**HasGender(meta)**>Genders | ETLDisciplinesJSON.json, ETLGenders.json | Includes user disciplines and genders
| temp_text         | N |
| unspsc_classes    | N |
| unspsc_commodities | N |
| unspsc_families   | N |
| unspsc_segments   | N |
| *users*             | Y | **Users**✔✔ | See *relations*, *user_bans*, *s_states*, *s_countries*, *s_users*, *comments*, *messages* | ETLUsersJSON.json✔✔ ||
| *user_bans*         | Y | **Flags**✔✔ | User>**IsFlagged**✔✔>Flags((Blacklist)) | ETLUserbansJSON.json✔✔ | Not sure how to deal with this yet.. Ultimately we don't really need a whole class of duplicated user info; we just need an IsBanned edge between users/IPs and a "banned" node? OR, perhaps there could be shades of grey in a new (list)? For now, there's a V class called "Flags" with a record named "Blacklist" that are connected to previously flagged users with a "Flagged" edge. Nothing is being done with the blacklisted IP addresses not associated with a username.
| watchlist         | N |
| web_scrapes       | N |
| zinvisible_organizations | N |
