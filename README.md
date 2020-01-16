# Bee Safe App

BeeSafe is a safety assistance app that allows users to view open and accessible spaces around Manchester. It uses the GPS co-ordinates from the users phone to navigate a user to the safe place. It also gives the user the ability to add a new safe place, save a safe place and add a review. Incase of emergency the user can call an emergency contact using the app. The frontend of the app has been built using React-Native, Redux and Google Maps API. The backend of the app has been built using AWS (lambda functions, boto3, dynamoDB).

### Installing

The application has been built on the ios platform using the EXPO CLI.

TO RUN THIS PROJECT LOCALLY :

1. Find the directory you would like to install the application

2. Enter `git clone https://github.com/TeamTruthNorthcoders/final-project.git` in the command line.

3. Navigate to the project in the command line and enter `code .` in the command line to open the project in your chosen code editor.

4. In order to view the project on an iPhone you will need to download the expo app which can be found on the app store.

5.You will need to install EXPO CLI to run the project which can be found here
`https://expo.io/learn`

6.Then enter `npm install` to install all dependencies for your project.

7.create a google api key https://developers.google.com/maps/documentation/embed/get-api-key
Create a key.js file in the root directory and paste in `export default APIKEY = “your api key”`

8. enter `npm start` in the command line to start the project. Your browser will open a file with a unique QR CODE.

9.Using your iphone use the camera to scan the the QR code which will prompt you to open in the EXPO app.

10.The app should now be loaded.

## Backend

`https://github.com/TeamTruthNorthcoders/safety-app-backend`

## Built With

- [EXPO](https://expo.io/)
- [NodeJS](https://nodejs.org/en/)
- [Google Maps Platform](https://developers.google.com/maps/documentation)
- [React Native](https://facebook.github.io/react-native/)
- [Redux](https://redux.js.org/introduction/getting-started/)

## Contributors

- **Jakub Reginia** - [Reghol](https://github.com/Reghol)
- **Michelle Grounds** - [MichelleGrounds](https://github.com/MichelleGrounds)
- **Marie Fayard** - [Mariefay](https://github.com/Mariefay)
- **David Elertas** - [DaveM80](https://github.com/DaveM80)
- **Hamza Qureshi** - [HamzaQureshi1](https://github.com/HamzaQureshi1)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
