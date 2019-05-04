# Trip Split API

* The server that lives [here](https://tripsplitbackend.herokuapp.com/) can be used for:
  * registration
  * user management
  * trip management
  * trip member management
  * expense management
  * expense member management

* A user's table consists of the following dataset:

```
{
    "id": 4,
    "username": "username",
    "first_name": "user",
    "last_name": "name",
    "gender": "Male",
    "avatar": "url link or a string",
    "password": "$2b$10$aeWFdkfRoXvBOFlD9i6fuub1xEMxmkDa4VVUzrJjR/VRVhQXk.YBi"
}
```

* A trip's table consists of the following dataset:

```
{
    "id": 1,
    "close_trip": false,
    "trip_name": "Disney World",
    "user_id": 1,
    "start_date": "2019-08-18T00:00:00.000Z",
    "end_date": "2019-08-31T00:00:00.000Z"
}
```

* A tripMember's table consist of the following dataset:

```
{
    "id": 1,
    "trip_username": "max",
    "trip_id": 1
}
```

* An expense table consist of the following dataset:

```
{
    "id": 1,
    "expense_name": "Four Seasons Hotel Expense",
    "trip_id": 1,
    "expense_total": 442.29
}
```

* An expenseMembers table consists of the following dataset:

```
{
    "id": 1,
    "expense_username": "max",
    "expense_id": 1,
    "expense_amount_paid": 120.34
}
```

## Registration and Login

* To register a user on the app, you need to make a **POST** request to this route, using the user table values without the user id (it is auto-generated). The username and password values are mandatory. The other fields are not.

  * ### https://tripsplitbackend.herokuapp.com/authentication/register
