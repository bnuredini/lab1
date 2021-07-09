import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Article } from "../models/article";
import {v4 as uuid} from 'uuid'

export default class ArticleStore {
    articleRegistry = new Map<string, Article>();
    selectedArticle: Article | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get articles() {
        return Array.from(this.articleRegistry.values());
    }

    loadArticles = async () => {
        try{
            const articles = await agent.Articles.list();
            runInAction(() => {
                articles.forEach(article => {
                    this.articleRegistry.set(article.id, article);
                  })         
            })
            this.setLoadingInitial(false);
        }catch (error) {
            console.log(error);
                this.loadingInitial = false;
            
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    selectArticle = (id: string) => {
        this.selectedArticle = this.articleRegistry.get(id)
    }

    cancelSelectedArticle = () => {
        this.selectedArticle = undefined;
    }

    openForm = (id?: string) => {
        id? this.selectArticle(id) : this.cancelSelectedArticle();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createArticle = async (article: Article) => {
        this.loading = true;
        article.id = uuid();
    
        try {
          await agent.Articles.create(article);
    
          runInAction(() => {
            this.articleRegistry.set(article.id, article);
            this.selectedArticle = article;
            this.editMode = false;
            this.loading = false;
          });
        } catch (err) {
          console.log(err);
    
          runInAction(() => {
            this.loading = false;
          });
        }
      };

    updateArticle = async (article: Article) => {
        this.loading = true;
        try{
            await agent.Articles.update(article);
            runInAction(() => {
                this.articleRegistry.set(article.id, article);
                this.selectedArticle = article;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteArticle = async (id: string) => {
        this.loading = true;
        try{
            await agent.Articles.delete(id);
            runInAction(() => {
                this.articleRegistry.delete(id)
                if(this.selectedArticle?.id === id) this.cancelSelectedArticle();
                this.loading = false;
            })
        } catch (error) {
            console.log('response: ', error.response.data);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
