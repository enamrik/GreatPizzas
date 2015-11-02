import ReactTestUtils from 'react/lib/ReactTestUtils'

export function shallowRender(element) {
  let shallowRenderer = ReactTestUtils.createRenderer();
  shallowRenderer.render(element);
  return shallowRenderer;
}

export function findByTestId(rootNode, testId) {
  let elements = filterElements(rootNode, (node) => {
    return node.props && node.props.testId === testId;
  });
  return elements.length == 0 ? null : elements[0];
}

function filterElements(node, predicate) {
  var results = [];

  if(!node) {
    return results;
  }

  if (predicate(node)) {
    results.push(node);
  }

  if (node.props && node.props.children && node.props.children.length) {
    for (var i = 0; i < node.props.children.length; i++) {
      results = results.concat(filterElements(node.props.children[i], predicate));
    }
  } else if (node.props && node.props.children) {
    results = results.concat(filterElements(node.props.children, predicate));
  }

  return results;
}
