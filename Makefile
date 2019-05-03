lint:
	npx eslint .
build:
	npm run build
test:
	npm test
test-coverage:
	npm test -- --coverage
publish:
	npm publish