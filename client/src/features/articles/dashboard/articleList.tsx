import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";



export default observer(function ArticleList() {
    const {articleStore} = useStore();
    const {deleteArticle, articles, loading} =articleStore
    const [target, setTarget] = useState('');


    function handleArticleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteArticle(id);
    }

    
    return(
        <Segment>
            <Item.Group divided>
                {articles.map(article => (
                    <Item key={article.id}>
                        <Item.Content>
                            <Item.Header as='a'>{article.title}</Item.Header>
                            <Item.Description>
                                <div>
                                {article.summary}
                                </div>
                                </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => articleStore.selectArticle(article.id)} floated='right' content='View' positive />
                                <Button name={article.id} loading={loading && target === article.id} onClick={(e) => handleArticleDelete(e, article.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
