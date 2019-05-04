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

* To register a user on the app, you need to make a **POST** request to this route, using the user table values without the user id (it is auto-generated). The username and password values are mandatory. The other fields are not. This route will return the user id, a token, and a welcome message.

  * ### https://tripsplitbackend.herokuapp.com/authentication/register

* To login a user on the app, you need to make **POST** request to this route. This fields require the username and password. This route will return a token, a user id, and a welcome message.

  * ### https://tripsplitbackend.herokuapp.com/authentication/login

## User related  endpoints

* a **GET** request to get a user by user id. The response would contain user data minus the password as well an array of trips created under the user's id as well as trips that the user is a part of. A response with that contains all the data fully populated returns the following:

```
{
    "username": "pandaMan",
    "first_name": "user",
    "last_name": "name",
    "gender": "Male",
    "avatar": "url link or a string",
    "ownedTrips": [
        {
            "id": 1,
            "trip_name": "Disney World",
            "isTripClosed": false,
            "start_date": "2019-08-18T00:00:00.000Z",
            "end_date": "2019-08-31T00:00:00.000Z"
        }
    ],
    "memberTrips": [
        {
            "trip_id": 2,
            "trip_name": "Wakanda"
        },
        {
            "trip_id": 3,
            "trip_name": "California"
        }
    ]
}
```

  * ### https://tripsplitbackend.herokuapp.com/users/:id

* a **PUT** request to edit user's info including: username, first_name, last_name, avatar, and gender

  * ### https://tripsplitbackend.herokuapp.com/users/:id

## Trip related endpoints

* a **GET** request to get all the trips regardless of the user:

  * ### https://tripsplitbackend.herokuapp.com/trips

* a **GET** request to get trips by trip id. The response from the server will be different as it contains a data to show the array of tripMembers and an array of expenses in that trip. A response with that contains all the data fully populated returns the following:

```
{
    "trip_id": 1,
    "trip_name": "Disney World",
    "trip_owner_id": 1,
    "trip_close_trip": false,
    "trip_start_date": "2019-08-18T00:00:00.000Z",
    "trip_end_date": "2019-08-31T00:00:00.000Z",
    "trip_members": [
        {
            "tripMember_id": 1,
            "member_username": "max"
        },
        {
            "tripMember_id": 2,
            "member_username": "mandy"
        }
    ],
    "expenseInfo": [
        {
            "expense_id": 2,
            "expense_name": "Amusement Park Tickets",
            "expense_total": 759.33
        },
        {
            "expense_id": 1,
            "expense_name": "Four Seasons Hotel Expense",
            "expense_total": 442.29
        }
    ]
}

```

  * ### https://tripsplitbackend.herokuapp.com/trips/:id

* a **POST** request to add trips. The response from the server will be like the above example of a trips table:

  * ### https://tripsplitbackend.herokuapp.com/trips

* a **PUT** request to edit trips by id. Edit the trip info using the fields from the trip's table.

  * ### https://tripsplitbackend.herokuapp.com/trips/:id

* a **DELETE** request to delete a trip by id. Will return a 1 if successful:

  * ### https://tripsplitbackend.herokuapp.com/trips/:id

## Trip Member related endpoints

* a **GET** request to see all the trips regardless of the trip id.

  * ### https://tripsplitbackend.herokuapp.com/tripMembers

* a **GET** request to see tripMembers by id. This would return just the specific member username and the trip id.

  * ### https://tripsplitbackend.herokuapp.com/tripMembers/:id

* a **POST** request to add a tripMember. The response would be what was shown in the tripMembers table above.

  * ### https://tripsplitbackend.herokuapp.com/tripMembers

* a **PUT** request to edit a tripMember using an id. Use the fields from above to edit a specfic tripMember by id.

  * ### https://tripsplitbackend.herokuapp.com/tripMembers/:id

* a **DELETE** request to delete a tripMember using an id. It returns a 1 if successful.

  * ### https://tripsplitbackend.herokuapp.com/tripMembers/:id
