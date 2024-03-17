import './styles.css'

interface IContainer {
	children: JSX.Element|JSX.Element[];
}

const Container = ({ children }: IContainer) => {
	return (
		<div className="container">
			{children}
		</div>
	)
};

export default Container;
