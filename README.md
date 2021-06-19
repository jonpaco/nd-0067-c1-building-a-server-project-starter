# Image Resize API

## Overview of the Application

The main application starts in `src/index.ts`.

In `index.ts` the folders for `images/` and `style/` are served up by express. The images in the images folder are used to present the resized image content. The style sheet is for simple formatting.

The main route comes from `router/api/resize.ts`. Most of the logic in here is to simply check, validate, and clean the inputs. Then the data is passed through to the `resize_image` method. If the height and width of 0 are passed they are handled by simply returning the image supplied in the project template. Once the image is resized and returned a template string from `src/template/view.ts` is used to generate the html and display it to the user.

Core logic of the application centers around `src/utilities/resize_image`. In this method the classes of `utilities/cacheEntry`, `utilities/imageCache`, and `utilities/cacheManager` are used for keeping track of the files, which includes writing them to disk for a persistent cache. The json file `cache.json` at the root of the project is used to store the cache. The `cacheManager` is the top level of the cache management structure, the `imageCache` is an intermediate level that keeps track of which images are in the cache, and `cacheEntry` keeps track of each resized variant image. Other than that the only other piece of functionality in `resize_image` is to use `sharp` to resize the image and store to disk.

All tests are located in the `src/tests/` folder. There is one suite of tests for testing the resize route using supertest. There is an additional test spec for testing the resize image behavior. The resize test is in `resizeSpec.ts`. The route testing is in `indexSpec.ts`.

### The following route types are supported

`http://localhost:3003/api/resize/<image>`
- Example is `http://localhost:3003/api/resize/fjord`, which returns the supplied image.

`http://localhost:3003/api/resize/<image>?width=<#>`
- Example is `http://localhost:3003/api/resize/fjord?width=300`, which returns a square image of 300px.

`http://localhost:3003/api/resize/<image>?height=<#>`
- Example is `http://localhost:3003/api/resize/fjord?height=200`, which returns a square image of 200px.

`http://localhost:3003/api/resize/<image>?height=<x>&width<y>`
- Example is `http://localhost:3003/api/resize/fjord?height=200&width=300`, which returns an image with 200px for the height and 300px for the width.


## Suggested Start Up Procedure

Use `npm run start` to build and run the application.

## Suggested Test Procedure

Use `npm run test` to build and run the unit tests. 
- Note that the unit test will generate some cached images.

