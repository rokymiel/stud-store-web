import { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Overlay } from 'react-bootstrap';

function ExSearch() {
	const [show, setShow] = useState(false);
	const target = useRef(null);

	return (
		<div>
			<div style={{
				textAlign: 'center', marginTop: '50px'
			}}>
				<h1 style={{
					color: 'green'
				}}>
					GeeksforGeeks
				</h1>
			</div>

			<div style={{
				textAlign: 'center', marginTop: '50px',
				position: 'relative'
			}}>
				<Button variant="danger"
					ref={target} onClick={
						() => setShow(!show)}>
					Click me to see
				</Button>

				<Overlay target={target.current}
					show={show} placement="bottom">
					{({ ...props }) => (
						<div
							{...props}
							style={{
								position: 'absolute',
								backgroundColor: 'rgba(255, 100, 100, 0.85)',
								padding: '10px',
								color: 'white',
								borderRadius: '8px',
								textAlign: 'center',
								width: '100px',
								top: '50%',
								transform: 'translateY(-50%)',
								...props.style,
							}}>
							<h6>React Overlay</h6>
						</div>
					)}
				</Overlay>
			</div>
		</div>
	);
}

export default ExSearch;
