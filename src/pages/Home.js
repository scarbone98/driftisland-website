import React, {useEffect, useState} from 'react';
import Container from "../components/Container";
import axios from 'axios';
import Image from '../components/Image';
import {Link} from 'react-router-dom';
import PageBody from "../components/PageBody";
import MyLoader from "../components/ArticleLoader";

function Body() {
    const [articles, setArticles] = useState({loading: true, data: []});
    useEffect(() => {
        async function fetchData() {
            try {
                const articles = await axios.get('http://localhost:5000/articles/getArticles');
                if (Array.isArray(articles.data)) {
                    setArticles({loading: false, data: articles.data});
                } else {
                    setArticles({loading: false, data: []});
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, []);
    return (
        <PageBody>
            <Container>
                <div style={{width: '70%', marginRight: 50}}>
                    {
                        articles.loading ?
                            <MyLoader/>
                            :
                            articles.data.map(article => {
                                console.log(article);
                                console.log(`http://localhost:5000/articles/image/${article.images[0]}`);
                                return (
                                    <div>
                                        <h2>
                                            {article.title}
                                        </h2>
                                        <h5>{article.subtitle}</h5>
                                        <Image
                                            src={`http://localhost:5000/articles/image/${article.images[0]}`}/>
                                        <div>
                                            {article.body}
                                        </div>
                                        <div style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            flex: 1,
                                            justifyItems: 'center',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end'
                                        }}>
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                                <div style={{width: 25, height: 25, marginRight: '0.5rem'}}>
                                                    {/*<Image*/}
                                                    {/*    src={`https://localhost:5000/articles/image/${article.images[0]}`}/>*/}
                                                </div>
                                                {/*<span>{article.author.name.first} {article.author.name.last}</span>*/}
                                                <span>Samuel Carbone</span>
                                            </div>
                                            <Link to={`/articles/${article._id}`} style={{color: 'black'}}>Read more
                                                >></Link>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
                <div style={{
                    width: '30%',
                    height: 200,
                    backgroundColor: 'rgba(239, 30, 31, 0.85)',
                    position: 'sticky',
                    top: 100
                }}>
                    SPONSOR BAR
                </div>
            </Container>
        </PageBody>
    )
}

function App() {
    return (
        <div style={{position: 'relative'}}>
            <Body/>
        </div>
    );
}

export default App;
