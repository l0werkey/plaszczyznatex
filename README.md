# plaszczyznatex

## How to build?

- `npm install`
- `npx cap sync android`
- `npm run build`
- `npx cap build android`

### If gradle cries try to specify org.gradle.java.home in android/gradle.properties
### If no sdk file found then create android/local.properties and add a sdk.dir property