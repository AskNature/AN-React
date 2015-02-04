# Database Migration

This file documents how data from the AskNature 1.x mySQL database has been mapped to the AskNature 2.x OrientDB database.

Learn more about the relationships found in the AskNature 1.x schema via [this set of diagrams](https://www.lucidchart.com/documents/view/4170522c-52fa-9c89-b8d7-7bbc0a00ce6b).

| Original Table Name | Migration Status | New Class Name/s | New Edge Name/s | ETL File | Notes |
| ---               | ---   | ---   | ---   | ---   | ---   |
| activity          | N |
| activity_phrases  | N |
| app_privileges    | N | | | | Defines which user types can edit files with various draft-related designations. |
| *areas*             | Y ✔ | **Phenomena**✔ | Phenomena>**ChildOf**>Phenomena✔, See *relations*. | ETLFunctionsCSV.json | AKA Functions. This taxonomy will serve edges connecting solutions with mechanisms AND outcomes. |
| articles          | N |||| Not sure what to do with these yet. We'll probably just start from scratch, since 'articles' don't have many impacts on the graph. |
| *comments*          | Y | **Comments** | Users>**WroteComment**>Comments, [Challenges,InspiredSolutions,LifeSolutions,LivingSystem,Phenomena,Users]>**HasComment**>Comments | ETLCommentsJSON.json | Needs to be imported after dependencies (strategy, product, user). |
| content_excludes  | N |
| curators          | N | | | | There are a few potentially valuable bios in this table, but they're all part of a discontinued curator community.
| email-templates   | N |||| There are some potentially valuable templates in this table, but there's not a great reason for them to live in the new DB. |
| entities          | N |||| This is basically a syntax localization table, which the new app will take care of in a different way. |
| entity_privileges | N |
| error_log         | N |
| *experts*           | Y | **Experts** | See *relations* | ETLExpertsJSON.json | This will likely be deprecated, but is being migrated b/c we're not 100% sure what to do with it yet..
| *files*             | Y | **Media** | See *relations* and *s_files* | ETLFilesJSON.json | We want to be able to do the following, too, but it doesn't exist yet: Users>**AddedMedia(Contributed)**>Media |
| geocache          | N |||| This table is populated by a script that USED TO automatically assign geographic info to addresses entered by users in their bios. The script is now defunct and we don't need this data anyway. |
| groups            | N |||| Defunct service. We'll start from scratch with any future features. |
| group_members     | N |||| Assigned users and roles to various groups. |
| habitats          | N |||| We may introduce a similar class in the future, but will start from scratch if we do. |
| *highligted_content* | Y | **Collections** || ETLCollectionJSON.json | This table contains info on the hand-curated collections of related content. These will represent the first public "collections" that will be owned by the new "AskNature" user.
| invitations       | N |
| log               | N |
| *messages*          | Y | | Users>**SentMessage**>Messages, Users>**ReceivedMessage**>Messages | ETLsender-message-receiver_EdgeJSON.json | Not sure yet how/if these will be integrated, but some users may at least want a record of past conversations. |
| *message_data*      | Y | **Messages** | See *messages* | ETLMessagesJSON.json | |
| *organisms*         | Y ✔ | **LivingSystems** ✔ | LivingSystem>**ChildSystemOf(ChildOf)**>LivingSystem  ✔ | ETLOrganismsCSV.json | Not sure if we really need to house the entire (HUGE) Linnaean taxonomy in AskNature, but we do for now.
| organism_data_sources | N |||| This is a decent list of data sources, but it's not being actively used. |
| portal_layouts    | N |
| *products*          | Y | **InspiredSolutions** | See *relations*, *comments* | ETLProductsJSON.json ||
| *reference_materials* | Y | **Sources** | See *relations* | ETLReferenceJSON.json ||
| *relations*         | Y | | [InspiredSolution,LifeSolution✔]>**HasOutcome**>Phenomena, InspiredSolution>**InspiredBy**>LifeSolution, InspiredSolution>**HasLivingSystem**>LivingSystem✔, [InspiredSolution,LifeSolution]>**StudiedBy**>Experts, [InspiredSolution,LifeSolution, Users]>**HasMedia**>Media, [InspiredSolution,LifeSolution]>**FeaturedIn**>Sources, User>**Friends**>User, User>**HasCollection**>Collections<**InCollection**<[InspiredSolution,LifeSolution] | ETLproduct-function_EdgeJSON.json, ETLstrategy-function_EdgeCSV.json✔, ETLproduct-strategy_EdgeJSON.json,  ETLstrategy-organism_EdgeCSV.json✔, ETLstrategy-expert_EdgeJSON.json, ETLproduct-expert_EdgeJSON.json, ETLstrategy-media_EdgeJSON.json, ETLproduct-media_EdgeJSON.json, ETLuser-media_EdgeJSON.json, ETLuser-user_EdgeJSON.json, ETLstrategy-user_EdgeJSON.json, ETLproduct-user_EdgeJSON.json ||
| schema_info       | N |
| search_history    | N |||| This will be exported and saved for posterity, though. |
| sessions          | N |||| Fun fact: AskNature keeps a log of every single session that's ever happened. 45 million and counting... |
| stats             | N |
| *strategies*        | Y ✔ | **LifeSolutions**✔ | See *relations*, *comments* | ETLStrategiesCSV.json ||
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
| *users*             | Y | **Users** | See *relations*, *user_bans*, *s_states*, *s_countries*, *s_users*, *comments*, *messages* | ETLUsersJSON.json ||
| *user_bans*         | Y | **Blacklist** | User>**IsFlagged**>Blacklist | ETLuser_bansJSON.json | Not sure how to deal with this yet.. Ultimately we don't really need a whole class of duplicated user info; we just need an IsBanned edge between users/IPs and a "banned" node? OR, perhaps there could be shades of grey in a new (list)?
| watchlist         | N |
| web_scrapes       | N |
| zinvisible_organizations | N |
