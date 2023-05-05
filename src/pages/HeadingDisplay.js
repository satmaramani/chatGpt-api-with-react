const HeadingDisplay = (props) => {
    return <>
   <h3 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', textDecoration: 'underline', color: '#0066CC', marginTop: '20px' }}>
  <b><u>{props.title}</u></b>
</h3>
    </>
}

export default HeadingDisplay;