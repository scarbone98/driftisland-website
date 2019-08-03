import React from 'react';
import PageBody from "../components/PageBody";
import Container from "../components/Container";
import {Flex,Box} from "reflexbox";

export default function AboutPage() {
    return (
        <PageBody>
            <Container>
                <Flex column w={1}>
                    <Box>
                        <h1>The Team</h1>
                    </Box>
                    <Box>
                        <Flex justify="space-between">
                            <div>Avatar</div>
                            <div>Description</div>
                        </Flex>
                    </Box>
                </Flex>
            </Container>
        </PageBody>
    )
}