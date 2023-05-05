import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import TextCompletion from "./pages/TextCompletion";
import Learnings from "./pages/Learnings";
import Translation from "./pages/Translation";
import TextCorrection from "./pages/TextCorrection";
import ExplainCode from "./pages/ExplainCode";
import CodeCorrection from "./pages/CodeCorrection";
import Image from "./pages/ImageCreate";
import ImageEdit from "./pages/ImageEdit";
import ImageVariations from "./pages/imageVariations";
import TextToSpeech from "./pages/TextToSpeech";
import GetModels from "./pages/GetModels";
import SpellingMistake from "./pages/SpellingMistake2";
import ChatBot from "./pages/ChatBot";

import Header from "./Header";
import NewLines from "./pages/NewLines";
import './Navigation.css';

import {
  Container,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default function App() {

  return (
    <>
      <Container>
        <BrowserRouter>
          <Header />
          <NewLines />

          <h1 style={{ textAlign: 'center' }}>  ChatGPT API Samples </h1>

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<TextCompletion />} />
              <Route path="GetModels" element={<GetModels />} />
              <Route path="learnings" element={<Learnings />} />
              <Route path="translation" element={<Translation />} />
              <Route path="textcorrection" element={<TextCorrection />} />
              <Route path="explainCode" element={<ExplainCode />} />
              <Route path="codeCorrection" element={<CodeCorrection />} />
              <Route path="image" element={<Image />} />
              <Route path="imageUpdate" element={<ImageEdit />} />
              <Route path="ImageVariations" element={<ImageVariations />} />
              <Route path="TextToSpeech" element={<TextToSpeech />} />
              <Route path="spellMistakes" element={<SpellingMistake />} />
              <Route path="ChatBot" element={<ChatBot />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}
