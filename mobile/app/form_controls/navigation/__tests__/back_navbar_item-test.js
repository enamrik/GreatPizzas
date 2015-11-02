describe('back_navbar_item', () => {
  let navBarItemBackIcon = {uri:"someImage"};
  const BackNavBarItem = require('inject!form_controls/navigation/back_navbar_item')({
    'react-native': React,
    'image!navbar_item_back': navBarItemBackIcon
  });

  it('should render title', () => {
    let expectedTitle = "someTitle";
    let output = shallowRender(<BackNavBarItem title={expectedTitle} />).getRenderOutput();
    let title = findByTestId(output, "title");
    expect(title.props.children).to.eq(expectedTitle);
  });

  it('should render image', () => {
    let output = shallowRender(<BackNavBarItem />).getRenderOutput();
    let image = findByTestId(output, "image");
    expect(image.props.source).to.eq(navBarItemBackIcon);
  });
});