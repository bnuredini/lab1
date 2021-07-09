import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ArticleForm () {

    const {articleStore} = useStore();
    const {selectedArticle, closeForm, createArticle, updateArticle, loading} = articleStore;    
    
    const initialState = selectedArticle ?? {
        id: '',
        title: '',
        summary: '',
        content: '',
    }

    const [article, setArticle] = useState(initialState);

    function handleSubmit() {
        article.id ? updateArticle(article) : createArticle(article);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setArticle({...article, [name]: value})
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={article.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Summary' value={article.summary} name='summary' onChange={handleInputChange} />
                <Form.TextArea placeholder='Content' value={article.content} name='content' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading={loading} />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})
