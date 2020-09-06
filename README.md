# music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 2020/9/4
URL 的 hash 
props 被设置为 true的意义是route.params 将会被设置为组件属性。如果你需要用到 route.params 可以配置成 true
this.$router.push({
        path: `/album/${this.id}`
      })
elmentUI组件怎么绑定原生事件,原生事件绑定要在后面加.native
store 传多个参数