import React from 'react'
import Navigation from '../Navigation/Navigation'
import Banner from '../../containers/Banner/Banner'

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children} : Props) => {
    return (
        <React.Fragment>
            <Navigation />
            <Banner/>
            <main>
                {children}
            </main>
        </React.Fragment>
    )
}

export default Layout