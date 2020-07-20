# React Cheatsheet

## How do I declare a component?

### Function Component
```jsx
const MyComponent = ({ name }) => {
  return (<p>Hello { name }</p>)
}
```

### Class Component
```js
class MyComponent extends React.Component {
  render() {
    return (<p>Hello { this.props.name }</p>)
  }
}
```

## Sending / receiving props

Props can be sent as key-value pairs using XML-style syntax:
```jsx
<MyComponent name='Amy' />
```

An object can be 'spread' to send the whole thing as the props:
```jsx
const props = { name: 'Amy' };
return (<MyComponent { ...props } />
```
