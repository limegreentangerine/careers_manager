<?php defined('C5_EXECUTE') or die('Access Denied.');
/**
 * @var array                                                                                     $params
 * @var array                                                                                     $items
 * @var array                                                                                     $formContent
 * @var mixed                                                                                     $result
 * @var string                                                                                    $pagination
 * @var \Concrete\Core\View\View                                                                  $view
 * @var \Concrete\Core\Form\Service\Form                                                          $form
 * @var \Concrete\Core\Validation\CSRF\Token|null                                                 $token
 * @var \Concrete\Package\CareersManager\Controller\SinglePage\Dashboard\CareersManager\Locations $controller
 */

if (in_array($controller->getAction(), ['details', 'add', 'save'])) {
    $view->element('dashboard/locations/details', [
        'form' => $form,
        'token' => $token,
        'entity' => $entity ?? null,
        'formContent' => $formContent
    ], 'careers_manager');
} else {
    $view->element('dashboard/locations/list', [
        'token' => $token,
        'params' => $params,
        'items' => $items,
        'result' => $result,
        'pagination' => $pagination,
    ], 'careers_manager');
}
