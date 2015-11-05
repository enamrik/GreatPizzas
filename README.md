### Requirements

NodeJS v4.0.0 

### Getting Started

#### Running the App

1. Clone repository at: `https://github.com/enamrik/GreatPizzas`
2. Navigate to the `<root>/backend` directory and run `gradle clean run`
3. Navigate to the `<root>/mobile` directory. Run `npm install`
4. Run `npm start` to spin up  **react-native-web-server**. Ensure that the ReactPackager is **not** running while the react-native-web-server is running
5. Open up ` GreatPizzas.xcodeproj`  at `<root>/mobile/ios` with Xcode and hit `Run`

#### Running Unit Tests

To run all unit tests, run `npm test`. This will start **Karma** and run unit tests in Chrome. All unit tests are written in **Mocha**.

To have Karma watch for file changes and run tests on file change, run `npm run test-session`

### Design Decisions

#### Packager

I switched from using the ReactPackager to WebPack because I wanted cleaner import statements. With WebPack I can now import scripts relative to root rather than relative to file. This means instead of this:

    import auth from '../../account/auth'
   
my imports look like this:

    import auth from 'domain/account/auth'

Facebook created their ReactPackager for speed, I'll need to keep an eye out for WebPack performance issues as GreatPizzas grows

#### Testing Strategy

Testing components in GreatPizzas is similar to how web pages are tested in Selenium. For instance, given the following component:

	class MyComponent extends Component {
	  render() {
	    return <View><Text>{this.props.title}</Text></View>;
	  }
	}

we want to verify that the component renders the title its given. To do this we give the Text element a **testId**, query the rendered Text element by its testId and assert on its **children** property, i.e.

 	class MyComponent extends Component {
	  render() {
	    return <View><Text testId="title">{this.props.title}</Text></View>;
	  }
	}

	it('should render title', () => {
	  let expectedTitle = "someTitle";
	  let output = shallowRender(<MyComponent title={expectedTitle} />).getRenderOutput();
	  let title = findByTestId(output, "title");
	  expect(title.props.children).to.eq(expectedTitle);
	});

You can find the `shallowRender` and `findByTestId` methods in `<root>/mobile/app/testing/shallow_rendering.js`
	    

