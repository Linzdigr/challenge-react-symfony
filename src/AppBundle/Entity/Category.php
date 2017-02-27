<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use AppBundle\Entity\AbstractGenericEntity;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="categories")
     * @ORM\HasLifecycleCallbacks
     */
    class Category extends AbstractGenericEntity{

        /**
         * @ORM\Column(type="string")
         */
        protected $label;

        /**
         * @ORM\Column(type="string")
         */
        protected $description;

        public function __construct($name = null){
            $this->name = $name;
        }

        public function getName(){
            return $this->label;
        }
        public function getDescription(){
            return $this->description;
        }

        public function setDescription($str){
            $this->description = $str;

            return $this;
        }

        public function setName($str){
            $this->label = $str;

            return $this;
        }

        public function __destruct(){}
    }
