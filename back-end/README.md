# REST API DOCUMENTATION

# User administrator

## E-terapias routes

### List e-terapias

`GET /eterapias`

**Parameters**
|             Name           |               Type              |               In              |             Description             |
|:---------------------------|:--------------------------------|:------------------------------|-------------------------------------|
| token                      | Bearer token                    | headers                       | Authenticate token. |
| sort                       | string                          | query                         | Sorts the results of your query by `name`, `created_at` or `updated_at`. |
| order                      | string                          | query                         | Determines whether the first search result returned is the highest number of matches `DESC` or lowest number of matches `ASC`. This parameter is ignored unless you provide `sort`. |
| per_page                   | integer                         | query                         | Number of results per page. |
| page                       | integer                         | query                         | Page number of the results to fetch. |
| relations                  | string                          | query                         | Get relations with `moderators`, `fieldJournalTemplate` or `fieldJournals` |
| search                     | string                          | query                         | Search by eterapias names. Also search by moderators emails, fieldJournalTemplates names and fieldJournals titles if you provide this `relations`.
