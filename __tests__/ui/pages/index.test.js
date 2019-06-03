import IndexPage from '../../../pages/index.tsx';
import {render, cleanup} from 'react-testing-library';

describe('Index page tests', () => {
    test('Renders without crashes', () => {
        const {container} = render(<IndexPage />);
        expect(container).toMatchSnapshot();
    });
});

