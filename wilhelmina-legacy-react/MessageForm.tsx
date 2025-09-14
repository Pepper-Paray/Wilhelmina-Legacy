import {useState} from 'react';
interface MessageFormProps {
    onSubmit:(text:string)=>Promise<void>;
    submitting:boolean;
}
export default function MessageForm({onSubmit, submitting}:MessageFormProps) {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState('flase');

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await  onSubmit( text);
    setSubmitted(true);
    };
    return (
        <div className= "form-container">
            {!submitted ? (
                <form onSubmit={handleSubmit} className="message-form">
                   import TextField form '@mui/material/TextField';
                   import TextField form './TextField'; 
                    <TextField
                    Vaule={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Your tribute"
                    className="textarea"
                    />
                    <button type="submit" disabled={submitting} className="submit-button">
                        {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                    </form>
            ) : (
                <div className="poetic-transition">
                    <p>Thank you for your tribute. It means a lot.</p>
                    <p>Just like a Southern sunset, your words will linger in our hearts.</p>
                </div>  
            )}
            </div>
    );
}