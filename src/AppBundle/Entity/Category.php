<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use Doctrine\Common\Collections\Criteria;
    use Doctrine\Common\Collections\ArrayCollection;
    use AppBundle\Entity\AbstractGenericEntity;
    use JMS\Serializer\Annotation\ExclusionPolicy;
    use JMS\Serializer\Annotation\Expose;
    use JMS\Serializer\Annotation\Groups;
    use JMS\Serializer\Annotation\VirtualProperty;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="categories", uniqueConstraints={@ORM\UniqueConstraint(name="category_name_unique",columns={"label"})})
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

        public function getLabel(){
            return $this->label;
        }
        public function getDescription(){
            return $this->description;
        }

        public function setDescription($str){
            $this->description = $str;

            return $this;
        }

        public function setLabel($str){
            $this->label = $str;
            return $this;
        }

        public function setName($str){
            $this->label = $str;

            return $this;
        }

        public function __destruct(){}
    }
