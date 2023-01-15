# react-native-code-push-dev-menu


[![react-native-code-push-dev-menu on npm](https://badgen.net/npm/v/react-native-code-push-dev-menu)](https://www.npmjs.com/package/react-native-code-push-dev-menu)
[![react-native-code-push-dev-menu downloads](https://badgen.net/npm/dm/react-native-code-push-dev-menu)](https://www.npmtrends.com/react-native-code-push-dev-menu)
[![react-native-code-push-dev-menu install size](https://packagephobia.com/badge?p=react-native-code-push-dev-menu)](https://packagephobia.com/result?p=react-native-code-push-dev-menu)
[![Code Quality](https://github.com/retyui/react-native-code-push-dev-menu/actions/workflows/code_quality.yml/badge.svg)](https://github.com/retyui/react-native-code-push-dev-menu/actions/workflows/code_quality.yml)


A dev menu for [react-native-code-push](https://github.com/microsoft/react-native-code-push). Links:

- Full Article: https://retyui.medium.com/stop-having-to-paying-for-slow-react-native-ios-builds-eeaa9de5d283
- App example: https://github.com/retyui/CodePushCiCd





https://user-images.githubusercontent.com/4661784/212563326-78cadd3e-a698-4c9e-8541-233ed70504ab.mov


### Installation

```bash
yarn add react-native-code-push-dev-menu
# or npm install react-native-code-push-dev-menu
```

### Usage

```tsx
// DevMenuScreen.tsx
import {
  CodePushDeMenuButton,
  configurateProject,
} from 'react-native-code-push-dev-menu';

configurateProject({
  readonlyAccessToken: Platform.select({
    // Read-only access tokens 
    // https://docs.microsoft.com/en-us/appcenter/api-docs/#creating-an-app-center-app-api-token
    ios: '128009dc42ded5e71ef21e007a24eb67b5c3279f',
    default: '42f471742864bd9c1917f322918b163a90d13904',
  }),
  appCenterAppName: Platform.select({
    ios: 'MyApp-iOS',
    default: 'MyApp-Android',
  }),
  appCenterOrgName: 'MyOrganizationTest',
});

function DevMenuScreen() {
  return (
    <SafeAreaView>
      <CodePushDeMenuButton />
      // Other dev things
    </SafeAreaView>
  );
}
```


