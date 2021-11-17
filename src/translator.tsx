import {
  ActionPanel,
  Detail,
  Form,
  SubmitFormAction,
  useNavigation
} from "@raycast/api";
import { useEffect, useState } from "react";
import { GoogleTranslator } from "@translate-tools/core/translators/GoogleTranslator";

const translator = new GoogleTranslator();

export default function Command() {
  const { push } = useNavigation();
  return (
    <Form
      actions={
        <ActionPanel>
          <SubmitFormAction
            title="Submit"
            onSubmit={input => {
              push(
                <TranslationScreen
                  originalText={input.textToTranslate}
                />
              );
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="textToTranslate"
        title="Translate input to German"
        placeholder="Enter text"
      />
    </Form>
  );
}


function TranslationScreen(props: { originalText: string }) {
  const [translatedText, setTranslatedText] = useState("");
  const { pop } = useNavigation();

  useEffect(() => {
    async function translate(textInput: string) {
      try {
        const translationResult = await translator.translate(
          textInput,
          "auto",
          "de"
        );
        setTranslatedText(translationResult);
      } catch (e) {
        console.error(e);
      }
    }

    translate(props.originalText)
      .then(() => console.log(translatedText.toString()))
      .catch(reason => console.error(reason));

  }, []);

  return <Detail
    markdown={translatedText.toString()}
    actions={
      <ActionPanel>
        <ActionPanel.Item
          title="Back"
          onAction={pop}
        />
      </ActionPanel>
    }
  />;
}
