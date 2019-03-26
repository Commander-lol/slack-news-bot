const request = require('request-promise')
const cheerio = require('cheerio')

const ogFilter = ['title', 'url', 'description']
const prefixOrder = ['og:', '', 'facebook:', 'twitter:']

exports.extractOpenGraph = async function extractOpenGraph(url) {
	const contents = await request.get(url)
	const $ = cheerio.load(contents)

	const parts = {
		title: '',
		url: '',
		description: '',
	}

	for (const name of ogFilter) {
		let value = ''
		for (const prefix of prefixOrder) {
			if (Boolean(value)) break

			let node = null
			if (name === 'title' && prefix === '') {
				node = $('title')
				if (node.length > 0) {
					const { children } = node[0]
					if (children.length > 0) {
						value = children.filter(child => child.type === 'text')
							.join(' ')
					}
				}
			} else {
				const search = `meta[name="${ prefix }${ name }"], meta[property="${ prefix }${ name }"]`
				node = $(search)
				if (node.length > 0) {
					const { attribs } = node[0]
					if (attribs != null) {
						value = attribs.content
					}
				}
			}
		}
		if (Boolean(value)) {
			parts[name] = value
		}
	}

	console.log(parts)

	return parts
}