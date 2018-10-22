import React from 'react'
import styled from 'styled-components'
import Email from 'overstock-component-library/lib/Icons/communication/Email_Fill'
import Facebook from 'overstock-component-library/lib/Icons/social/Facebook'
import Twitter from 'overstock-component-library/lib/Icons/social/Twitter'
import Pinterest from 'overstock-component-library/lib/Icons/social/Pinterest'
import Link from 'overstock-component-library/lib/Icons/navigation/Link'
import ArrowsSmallLeft from 'overstock-component-library/lib/Icons/arrows/Small_Left'

export default () => {


    return (
        <Wrapper>
            <BackButton onClick={() => window.history.back()}><ArrowsSmallLeft color="#545658" />Back</BackButton>
            <IconWrapper>
                <Bubble color="#444"><EmailIcon /></Bubble>
                <Bubble color="#35609f"><FacebookIcon /></Bubble>
                <Bubble color="#2ca9e1"><TwitterIcon /></Bubble>
                <Bubble color="#cb2025"><PinterestIcon /></Bubble>
                <Bubble color="#6a6a6a"><LinkIcon /></Bubble>
            </IconWrapper>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    max-width: 1620px;
    margin: 24px;

    @media(min-width: 1128px) {
        margin: 24px 80px;
    }
    @media(min-width: 1780px) {
        margin: 24px auto;
    }
`

const BackButton = styled.div`
    align-items: center;
    background: #f5f6f7;
    border-radius: 20px;
    color: #545658;
    display: flex;
    flex-direction: row;
    padding: 10px 30px;
`

const IconWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

const Bubble = styled.div`
    align-items: center;
    background: ${props => props.color};
    border-radius: 100%;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin-left: 8px;
    max-width: 20vw;
    max-height: 20vw;
    padding: 10px;
    width: 40px;
    height: 40px;

    svg {
        fill: #fff;
    }
`

const EmailIcon = styled(Email)`
    width: 100%;

`
const FacebookIcon = styled(Facebook)`
    width: 100%;

`
const TwitterIcon = styled(Twitter)`
    width: 100%;

`
const PinterestIcon = styled(Pinterest)`
    width: 100%;
    fill: red;
`
const LinkIcon = styled(Link)`
    width: 100%;

`

