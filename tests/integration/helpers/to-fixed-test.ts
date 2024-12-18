import { module, test } from 'qunit'
import { setupRenderingTest } from 'addition/tests/helpers'
import { render } from '@ember/test-helpers'
import { hbs } from 'ember-cli-htmlbars'

module('Integration | Helper | to-fixed', function (hooks) {
  setupRenderingTest(hooks)

  // TODO: Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('inputValue', '1234')

    await render(hbs`{{to-fixed this.inputValue}}`)

    assert.dom().hasText('1234')
  })
})
