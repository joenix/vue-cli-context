# vue-cli-context

> Sampily to get the Packages in Directory

```sh
npm i vue-cli-context
# or
yarn add vue-cli-context
```

```js
import contextual from "vue-cli-context";

contextual({
  // context
  context: require.context(
    // directory
    `@/pages/`
    // recursive
    true,
    // regular
    /.js$/
  ),
  // expect
  expect: pkg => pkg
  // if need some injections, it must be export a function within the file
  inject: {
    say: `hello world`
  }
}).then( pkgs => console.log(pkgs));
```

```js
// sample package with option: `inject`
export default ({ say }) => {
  console.log(say);
  // each package must set propert: `name`
  return {
    name: `sample`
  };
};
```
