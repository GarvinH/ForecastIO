import React from 'react'
import { Container, Spinner, Alert } from 'react-bootstrap'

export const contentDeterminer = (content: JSX.Element, loading: boolean, code: number | null, message: string | null) => {
    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>)
    } else if (code !== 200 && code !== null) {
        return (<Container className="text-center">
            <Alert variant="danger" style={{ textTransform: "capitalize" }}>Error {code}. {message}</Alert>
        </Container>)
    } else {
        return content
    }
}