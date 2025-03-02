import {
	DefaultColorStyle,
	Editor,
	TLGeoShape,
	TLShapePartial,
	Tldraw,
	createShapeId,
	useEditor,
} from 'tldraw'
import 'tldraw/tldraw.css'
import { useEffect } from 'react'

// There's a guide at the bottom of this file!

//[1]
export const Abstraction = () => {
	const handleMount = (editor: Editor) => {
		// Create a shape id
		const id = createShapeId('hello')

		// Create a shape
		editor.createShapes<TLGeoShape>([
			{
				id,
				type: 'geo',
				x: 128,
				y: 128,
				props: {
					geo: 'rectangle',
					w: 100,
					h: 100,
					dash: 'draw',
					color: 'black',
					size: 'm',
				},
			},
		])

		// Get the created shape
		const shape = editor.getShape<TLGeoShape>(id)!

		const shapeUpdate: TLShapePartial<TLGeoShape> = {
			id,
			type: 'geo',
			props: {
				w: shape.props.w*2,
				h: shape.props.h,
				text: '抽象思维',
			},
		}

		// Update the shape
		editor.updateShapes([shapeUpdate])

		// Select the shape
		editor.select(id)

		// Rotate the shape around its center
		// editor.rotateShapesBy(id, Math.PI / 8)

		// Clear the selection
		editor.selectNone()

		// Zoom the camera to fit both shapes
		// editor.zoomToFit()
	}

	return (
		<div className="tldraw__editor h-[90vh]">
			<Tldraw persistenceKey="api-example" onMount={handleMount}>
				<InsideOfEditorContext />
			</Tldraw>
		</div>
	)
}

//[2]
const InsideOfEditorContext = () => {
	const editor = useEditor()

	useEffect(() => {
		let i = 0

		const interval = setInterval(() => {
			const selection = [...editor.getSelectedShapeIds()]
			editor.selectAll()
			editor.setStyleForSelectedShapes(DefaultColorStyle, i % 2 ? 'blue' : 'light-blue')
			editor.setStyleForNextShapes(DefaultColorStyle, i % 2 ? 'blue' : 'light-blue')
			editor.setSelectedShapes(selection)
			i++
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [editor])

	return null
}