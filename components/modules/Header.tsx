import {useContext} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {useObserver} from 'mobx-react-lite';
import {AppStoreContext} from '../../stores/app';
import {INavigationItem} from '../../stores/navigation';

export function HeaderItem({items, id, href, title}: INavigationItem) {
    if (items && items.length) {
        return (
            <NavDropdown id={id} title={title}>
                {items.map(({title, href, id}: INavigationItem) => (
                    <NavDropdown.Item key={id} href={href}>{title}</NavDropdown.Item>
                ))}
            </NavDropdown>
        )
    }

    return (
        <Nav.Link key={id} href={href}>{title}</Nav.Link>
    );
}

export type IHeaderProps = {
    title: string
}

export default function Header({title}: IHeaderProps) {
    const {stores: {navigation, user}} = useContext(AppStoreContext);
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">{title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {useObserver(() => (
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {navigation && navigation.items && navigation.items.map &&
                        navigation.items.map((item: INavigationItem) => (
                            <HeaderItem key={item.id} {...item} />
                        ))}
                    </Nav>
                </Navbar.Collapse>
            ))}
            <Nav.Item role="user" className="mr-sm-2">
                <span>{`${user.fullName} | ${user.user.funds} $`}</span>
            </Nav.Item>
        </Navbar>
    );
}
