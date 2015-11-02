export default function(react) {
  react.StyleSheet = { create: (styles) => styles};
  react.View = class extends react.Component { render() {}};
  react.TouchableOpacity = class extends react.Component { render() {}};
  react.Text = class extends react.Component { render() {}};
  react.Image = class extends react.Component { render() {}};
}