import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

export default class Loading extends Component {
	render() {
		return (
			<div
				className={`text-center  ${
					this.props.padding ? this.props.padding : 'pt-5'
				} px-5 ${this.props.position && this.props.position} ${
					this.props.right
				}`}
				style={{
					zIndex: this.props.zIndex,
					right: this.props.right,
					left: this.props.left,
					width: '300px',
					margin: '0 auto',
				}}
			>
				{this.props.message ? (
					<span>{this.props.message}</span>
				) : (
					<span>Loading</span>
				)}
				<LinearProgress className="progress-bar-striped rounded mt-5" />
			</div>
		)
	}
}
