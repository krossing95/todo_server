import RequestBodyChecker from "../../../helpers/helpers.request_checker"

export default function CategoryController() {
    const { isTrueBodyStructure } = RequestBodyChecker()
    const saveCategory = (req, res) => {
        let { category_name } = req.body
        const expected_payload = ['category_name']
        const isTrueBody = isTrueBodyStructure(expected_payload, req.body)
        if (!isTrueBody) return res.status(400).json({ message: 'Bad request', code: '400', data: {} })
        if (category_name.trim().length === 0) return res.status(412).json({ message: 'Category name required', code: '412', data: {} })

    }
    return {
        saveCategory
    }
}