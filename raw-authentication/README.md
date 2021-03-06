### Step-1: Create a Firebase Project
```bash
1. Go to firebase
2. Get started
3. Create a new project
4. Off google analytics
5. Continue
6. Web
7. Register: give a nickname > next > next > next
8. Continue To The Console
```

### Step-2: Google and Email Authentication
```bash
1. Go to firebase
2. Get started
3. Create a new project
4. Off google analytics
5. Continue
6. Web
7. Register: give a nickname > next > next > next
8. Continue To The Console
9. Go to console
10. Create a new app
11. Go to the Auth tab
12. Add Google Auth > Enable > give support email > Save
13. Add New Provider
14. Enable Email Auth
```
### Step-3: Then
```bash
1. FIrebase documentation
2. Fundamentals
3. Web
```
### Step-4: Copy firebase config file
```bash
1. Go to your project Overview
2. Go to Project Settings
3. Scroll down
4. Copy the config file
```

### Step-5: Install firebase on your project
```bash
npm install firebase
```

### Step-6: Initialize Firebase
```bash
1. import * as firebase from 'firebase/app';
2. import 'firebase/auth';
3. import { firebaseConfig } from './firebase.config';

4. firebase.initializeApp(firebaseConfig);
```
### Step-7 : Google Sign In
```bash
1. https://firebase.google.com/docs/auth/web/google-signin?authuser=0#web-version-9

2.   const provider = new firebase.auth.GoogleAuthProvider();

```

### Step-8: All things in Google Sign In
```bash
/* Imported File */
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
```

```bash
/* Initialize Firebase */
firebase.initializeApp(firebaseConfig);
```

```bash
/* Auth Provider */
const provider = new GoogleAuthProvider(); 
const auth = getAuth();
```
```bash

/* EventHandler*/
const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user.photoURL);
    })
  }
```

### handleSubmit and handleBlur
```bash
The main thing is that. At first you have to validate the email and password in handleBlur.
And pass this email and password to the useState hook of React.
Then submit the form to handleSubmit function. That will read the email and password from the useState hook.
After that, if the email and password remains, only then the submission will be occurred.
```