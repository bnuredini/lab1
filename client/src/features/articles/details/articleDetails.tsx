import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default function ArticleDetails () {

    const {articleStore} = useStore();
    const {selectedArticle: article, openForm, cancelSelectedArticle} = articleStore

    if (!article) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
        <Card.Header>{article.title}</Card.Header>
        <Card.Description>{article.content}</Card.Description>
        <Button.Group widths='2'>
            <Button onClick={() => openForm(article.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectedArticle} basic color='red' type='danger' content='Cancel' />
        </Button.Group>
            </Card.Content>
        </Card>
    )
}
