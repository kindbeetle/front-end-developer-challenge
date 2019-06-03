import {Card, Button} from 'react-bootstrap';
import Link from 'next/link';

interface IGreetingProps extends IArticle {
    link: ILink
}

export default function Greeting({title, text, link, coverImage}: IGreetingProps) {
    return <div className="Greeting">
        <Card bg="light" border="primary">
            <Card.Img variant="top" src={coverImage}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {text}
                </Card.Text>
                <Link href={link.href}>
                    <Button variant="primary">{link.title}</Button>
                </Link>
            </Card.Body>
        </Card>
        <style global jsx>
            {`
                    .Greeting {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem 0;
                    }

                    .Greeting .card {
                        max-width: 100vw;
                        width: 50rem;
                    }
                `}
        </style>
    </div>
}
