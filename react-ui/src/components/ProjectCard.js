import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Col
} from 'reactstrap';

/**
 * 
 * @param {Object} props --> link,image,name,description,star,forks 
 * @returns 
 */
const ProjectCard = (props) => {
    return (
        <Col sm={3} className="mb-4">
            <a href={props.link}>
                <Card>
                    <img style={{objectFit: 'cover'}} height="150pd" src={props.image} />
                    <CardBody>
                        <CardTitle tag="h3">{props.name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Star</CardSubtitle>
                        <CardText tag="h6">{props.description}</CardText>
                    </CardBody>
                </Card>
            </a>
        </Col>
      );
}

export default ProjectCard;