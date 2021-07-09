import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { Article } from "../../../app/models/article";
import ArticleList from "./articleList";
import ArticleDetails from "../details/articleDetails";
import ArticleForm from "../form/articleForm";
import { useStore } from "../../../app/stores/store";

interface Props{
    articles: Article[];
}

export default observer(function ArticleDashboard({articles}: Props) {

    const {articleStore} = useStore();
    const {selectedArticle, editMode} = articleStore; 

    return(
        <Grid>
            
            <Grid.Column width='10'>
            <ArticleList/>
            </Grid.Column>
            <Grid.Column width='6' fluid>
                { selectedArticle && !editMode &&
            <ArticleDetails 
            />}
            { editMode &&
            <ArticleForm
            />}
            </Grid.Column>
        </Grid>
    )
})
