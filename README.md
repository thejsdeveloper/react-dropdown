# React Select (Dropdown)

[Live Site](https://thejsdeveloper-react-dropdown-dev.netlify.app/)

- It is a dropdown which takes data from local as well as from remote api (currently it is fetch lsit of all countries) and show it based on limit set by user.
- When you click on dropdown header it will show records
- Click on outside will close the dropdown.
- When user click on last button which shows how many more records are hidden, It shows all the items.
- User can search the records by entering filter text in input box which is debounced for performance.
- If something is not found and user has previlage to add reords, user can add it to list.
- User can also hide search box if not required
- If user does not pass limit, dropdown will show all the `items

##Options

- Option should be in this format

```
    {
      id: [uniqueId] string,
      value: string,
      icon: [iconUrl] string
    }
```

| Option           | Usage                                                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title            | This is to set empty state titile `Select Items` by default                                                                                                                |
| options          | Pass local data in options                                                                                                                                                 |
| asyncOptions     | Pass asyncOptions `data stream` for remote api to fetch data from there you can user [rxjs ajax](https://www.learnrxjs.io/learn-rxjs/operators/creation/ajax) to create it |
| limit            | To limit the dropdown options                                                                                                                                              |
| multSelect       | To enable nultiselect pass `true` , false by default                                                                                                                       |
| enableSearch     | To enable search pass `true`, `true` by default                                                                                                                            |
| hasAddPermission | To allow users to add new option if not available in select, `false` by default                                                                                            |
| onSelection      | Emits the array of selected records as soon as user selects                                                                                                                |
| ignoreIcon       | If you do not want to show icon, Default is a flag icon for flag                                                                                                           |

`Note that if asyncOptions and option both are provided options are ignored`

## Screenshots

-Dropdown

![Dropdown](public/dropdown.png?raw=true)

-Dropdown Expanded

![Dropdown](public/dropdown-expanded.png?raw=true)

-Dropdown search with add permissions

![Dropdown](public/dropdown-search.png?raw=true)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

```

```
