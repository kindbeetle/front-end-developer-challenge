import {useContext} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {useObserver} from 'mobx-react-lite';
import {AppStoreContext} from '../../stores/app';
import {INavigationItem} from '../../stores/navigation';
import _ from 'lodash';

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
    const {stores: {navigationStore, userStore}} = useContext(AppStoreContext);

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">{title}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {useObserver(() => (
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {navigationStore && navigationStore.items && navigationStore.items.map &&
                         navigationStore.items.map((item: INavigationItem) => (
                            <HeaderItem key={item.id} {...item} />
                         ))}
                    </Nav>
                    <Nav.Item role="user" className="mr-sm-2">
                        <NavDropdown id="user" title={userStore.fullName}>
                            {Object.keys(_.get(userStore, 'user.funds', {})).map((currency: string, id: number) => (
                                <NavDropdown.Item key={id}>{`${_.get(userStore,`user.funds.${currency}`)} ${currency}`}</NavDropdown.Item>
                            ))}
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav.Item>
                </Navbar.Collapse>
            ))}

        </Navbar>
    );
}
