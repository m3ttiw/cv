# `angular.json` adjustments (if needed)

Make sure the `assets` section includes the `404.html` file so it gets copied to the build:

```jsonc
// angular.json (snippet)
{
  "projects": {
    "cv-site": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/404.html"
            ]
          }
        }
      }
    }
  }
}
```

> If your project name differs from `cv-site`, adjust the paths accordingly.
