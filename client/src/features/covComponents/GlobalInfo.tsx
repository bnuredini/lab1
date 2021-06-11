import styled from "@emotion/styled";

interface Props {
    newConfirmed: number;
    newDeaths: number;
    newRecovered: number;
}

const Wrapper = styled.div`
    text-align: center;
`;

const GlobalInfo: React.FunctionComponent<Props> = ({ newConfirmed, newDeaths, newRecovered }) => {
    return <Wrapper> 
        <h1>Statistikat Globale te Covid-19</h1>
        <h3>Rastet e reja te konfirmuara: {new Intl.NumberFormat().format(newConfirmed)}</h3>
        <h3>Rastet e reja te vdekjeve: {new Intl.NumberFormat().format(newDeaths)}</h3>
        <h3>Rastet e reja e te sheruarve: {new Intl.NumberFormat().format(newRecovered)}</h3>
    </Wrapper>
}

export default GlobalInfo;