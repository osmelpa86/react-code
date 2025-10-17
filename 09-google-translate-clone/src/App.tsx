import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {useStore} from "./hooks/useStore.ts";
import {Button, Col, Container, Row, Stack} from "react-bootstrap";
import {AUTO_LANGUAGE, VOICE_FOR_LANGUAGE} from "./constants.ts";
import {ArrowsIcon, ClipboardIcon, SpeakerIcon} from "./components/Icons.tsx";
import {LanguageSelector} from "./components/LanguageSelector.tsx";
import {SectionType} from "./type.ts";
import {TextArea} from "./components/TextArea.tsx";
import {useEffect} from "react";
import {translate} from "./services/translate.ts";
import {useDebounce} from "./hooks/useDebounce.ts";

function App() {
    const {
        fromLanguage,
        toLanguage,
        frontText,
        result,
        loading,
        interchangeLanguage,
        setFromLanguage,
        setToLanguage,
        setFrontText,
        setResult
    } = useStore();

    const debounceFromText = useDebounce(frontText);

    useEffect(() => {
        if (debounceFromText === '') return;
        translate({fromLanguage, toLanguage, text: debounceFromText}).then(result => {
            if (result == null) return;
            setResult(result);
        }).catch(() => setResult('Error'));
    }, [debounceFromText, fromLanguage, toLanguage]);

    const handleClipboard = () => {
        navigator.clipboard.writeText(result).then();
    }

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(result)
        utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
        utterance.rate = 0.9
        speechSynthesis.speak(utterance)
    }

    return (
        <Container fluid>
            <h1>Google Translate</h1>
            <Row>
                <Col>
                    <Stack gap={2}>
                        <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage}/>
                        <TextArea type={SectionType.From} value={frontText} onChange={setFrontText}/>
                    </Stack>
                </Col>
                <Col xs="auto">
                    <Button variant="link" disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguage}>
                        <ArrowsIcon/>
                    </Button>
                </Col>
                <Col>
                    <Stack gap={2}>
                        <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage}/>
                        <div
                            style={{position: 'relative'}}>
                            <TextArea type={SectionType.To} value={result} onChange={setResult} loading={loading}/>

                            <div style={{position: 'absolute', left: 0, bottom: 0, display: 'flex'}}>
                                <Button variant="link"
                                        onClick={handleClipboard}>
                                    <ClipboardIcon/>
                                </Button>
                                <Button variant="link"
                                        onClick={handleSpeak}>
                                    <SpeakerIcon/>
                                </Button>
                            </div>
                        </div>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default App