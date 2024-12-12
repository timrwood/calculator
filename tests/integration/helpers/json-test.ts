import { module, test } from 'qunit'
import { setupRenderingTest } from 'addition/tests/helpers'
import { render } from '@ember/test-helpers'
import { hbs } from 'ember-cli-htmlbars'

module('Integration | Helper | json', function (hooks) {
  setupRenderingTest(hooks)

  // TODO: Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('inputValue', '1234')

    await render(hbs`{{json this.inputValue}}`)

    assert.dom().hasText('1234')
  })
})
