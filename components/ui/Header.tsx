import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {useObserver} from 'mobx-react-lite';
import {useContext} from 'react';
import {AppStoreContext} from '../../stores/app';
import {ItemType} from '../../stores/navigation';

export function HeaderItem({items, id, href, title}: ItemType) {
    if (items && items.length) {
        return (
            <NavDropdown id={id} title={title}>
                {items.map(({title, href, id}: ItemType) => (
                    <NavDropdown.Item key={id} href={href}>{title}</NavDropdown.Item>
                ))}
            </NavDropdown>
        )
    }

    return (
        <Nav.Link key={id} href={href}>{title}</Nav.Link>
    );
}

export type HeaderPropsType = {
    title: string
}

export default function Header({title}: HeaderPropsType) {
    const {stores: {navigation}} = useContext(AppStoreContext);
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">{title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {useObserver(() => (
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {navigation && navigation.items && navigation.items.map((item: ItemType) => (
                            <HeaderItem {...item} />
                        ))}
                    </Nav>
                </Navbar.Collapse>
            ))}
        </Navbar>
    );
}
