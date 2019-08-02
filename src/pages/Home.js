import React, {useEffect, useState} from 'react';
import Container from "../components/Container";
import axios from 'axios';
import Image from '../components/Image';
import {Link} from 'react-router-dom';
import PageBody from "../components/PageBody";
import MyLoader from "../components/ArticleLoader";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import {Flex, Box} from "reflexbox";
import classNames from 'classnames';
import './Home.scss';
import {getArticles, getNumArticles} from "../API";
import Article from '../components/Article';

function Body() {
    const [articles, setArticles] = useState({loading: true, data: [], number: 0});
    useEffect(() => {
        async function fetchData() {
            try {
                const numArticles = await getNumArticles();
                setArticles({...articles, number: numArticles.count});
                const articleData = await getArticles();
                if (Array.isArray(articleData)) {
                    setArticles({...articles, loading: false, data: articleData});
                } else {
                    setArticles({...articles, loading: false, data: []});
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, []);
    let placeHolders = [];
    for (let i = 0; i < articles.number; i++) {
        placeHolders.push(<MyLoader/>);
    }
    return (
        <PageBody>
            <Container>
                <Flex style={{width: '100%'}}>
                    <Box w={1} className={classNames('article-container', {mobile: isMobile, browser: isBrowser})}>
                        {
                            articles.loading ?
                                placeHolders
                                :
                                articles.data.map(article => {
                                    console.log(article);
                                    console.log(`http://localhost:5000/articles/image/${article.images[0]}`);
                                    return <Article title={article.title} body={article.body} id={article._id}
                                                    author={{first: article.firstName, last: article.lastName}}
                                                    image={article.images[0]} subtitle={article.subtitle}/>
                                })
                        }
                    </Box>
                    <BrowserView>
                        <Box
                            style={
                                {
                                    width: 200,
                                    height: 200,
                                    backgroundColor: 'rgba(239, 30, 31, 0.85)',
                                    position: 'sticky',
                                    top: 100
                                }
                            }
                            w={1}
                        >
                            SPONSOR BAR
                        </Box>
                    </BrowserView>
                </Flex>
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
